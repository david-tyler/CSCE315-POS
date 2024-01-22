package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemToIngredient;
import com.project3.backend.reports.ItemToOrderWithQuantity;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.SalesReport;
import com.project3.backend.repository.ItemRepository;
import com.project3.backend.repository.ItemToIngredientRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;


/**
 * This class represents the implementation of the ItemService interface.
 * It provides methods to interact with and manipulate items in the system.
 */
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemToIngredientRepository itemToIngredientRepository;

    /**
     * Retrieves a list of all menu items in the system.
     *
     * @return List of Item objects representing menu items.
     */
    public List<Item> fetchMenuItems() {
        return (List<Item>) itemRepository.findAll();
    }

    /**
     * Saves a new item to the system or updates an existing one.
     *
     * @param item The Item object to be saved or updated.
     * @return The saved or updated Item object.
     */
    public Item saveItem(Item item) {
        Item savedItem = itemRepository.save(item);

        // Process and save item ingredients
        if (item.getIngredients() != null) {
            List<ItemToIngredient> itemsToIngredient = item.getIngredients().entrySet().stream()
                .map(entry -> {
                    ItemToIngredient itemToIngredient = itemToIngredientRepository.findByItemIdAndIngredientId(savedItem.getId(), entry.getKey());
                    if (itemToIngredient == null) {
                        itemToIngredient = new ItemToIngredient();
                    }
                    itemToIngredient.setItemId(savedItem.getId());
                    itemToIngredient.setIngredientId(entry.getKey());
                    itemToIngredient.setQuantity(entry.getValue());
                    return itemToIngredient;
                })
                .collect(Collectors.toList());

            // Delete ingredients not present in the updated item
            List<ItemToIngredient> existingItemToIngredients = itemToIngredientRepository.findByItemId(savedItem.getId()).stream()
                .filter(itemToIngredient -> !item.getIngredients().containsKey(itemToIngredient.getIngredientId()))
                .collect(Collectors.toList());
            itemToIngredientRepository.deleteAll(existingItemToIngredients);

            // Save the updated item ingredients
            itemToIngredientRepository.saveAll(itemsToIngredient);
        }

        return savedItem;
    }

    /**
     * Deletes an item from the system based on its ID.
     *
     * @param id The ID of the item to be deleted.
     */
    @Transactional
    public void deleteItem(int id) {
        itemToIngredientRepository.deleteByItemId(id);
        itemRepository.deleteById(id);
    }

    /**
     * Retrieves a list of items with their quantities based on an order ID.
     *
     * @param orderId The ID of the order.
     * @return List of ItemToOrderWithQuantity objects representing items and their quantities in the order.
     */
    public List<ItemToOrderWithQuantity> fetchItemsByOrderId(int orderId) {
        return itemRepository.findByItemToOrders_orderId(orderId);
    }

    /**
     * Generates a sales report for items within a specified date range.
     *
     * @param startDate The start date of the report.
     * @param endDate   The end date of the report.
     * @return List of SalesReport objects representing sales data.
     */
    public List<SalesReport> salesReport(LocalDateTime startDate, LocalDateTime endDate) {
        return itemRepository.findItemsWithOrderCount(startDate, endDate);
    }

    /**
     * Retrieves a list of items with excess quantities within a specified date range.
     *
     * @param startDate The start date of the range.
     * @param endDate   The end date of the range.
     * @return List of Item objects with excess quantities.
     */
    public List<Item> excessItems(LocalDateTime startDate, LocalDateTime endDate) {
        return itemRepository.findExcessItems(startDate, endDate);
    }

    /**
     * Retrieves a list of items that are frequently ordered together within a specified date range.
     *
     * @param startDate The start date of the range.
     * @param endDate   The end date of the range.
     * @return List of OrderedTogetherReport objects representing items ordered together.
     */
    public List<OrderedTogetherReport> fetchItemsOrderedTogether(LocalDateTime startDate, LocalDateTime endDate) {
        return itemRepository.findItemsOrderedTogether(startDate, endDate);
    }
}
