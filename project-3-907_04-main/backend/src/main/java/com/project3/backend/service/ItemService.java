package com.project3.backend.service;

import com.project3.backend.entity.Item;
import com.project3.backend.reports.ItemToOrderWithQuantity;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.SalesReport;

import java.time.LocalDateTime;
import java.util.List;

/**
 * This interface defines the operations that can be performed on items in a menu.
 */
public interface ItemService {

    /**
     * Retrieves a list of all menu items.
     *
     * @return List of Item objects representing the menu items.
     */
    List<Item> fetchMenuItems();

    /**
     * Saves a new menu item or updates an existing one.
     *
     * @param item The Item object to be saved or updated.
     * @return The saved or updated Item object.
     */
    Item saveItem(Item item);

    /**
     * Deletes a menu item by its ID.
     *
     * @param id The ID of the item to be deleted.
     */
    void deleteItem(int id);

    /**
     * Retrieves a list of items with quantities associated with a specific order ID.
     *
     * @param orderId The ID of the order.
     * @return List of ItemToOrderWithQuantity objects representing items with quantities in the order.
     */
    List<ItemToOrderWithQuantity> fetchItemsByOrderId(int orderId);

    /**
     * Generates a sales report within a specified date range.
     *
     * @param startDate The start date of the report period.
     * @param endDate   The end date of the report period.
     * @return List of SalesReport objects representing the sales report.
     */
    List<SalesReport> salesReport(LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Retrieves a list of items that have excess quantity within a specified date range.
     *
     * @param startDate The start date of the period to check for excess items.
     * @param endDate   The end date of the period to check for excess items.
     * @return List of Item objects representing items with excess quantity.
     */
    List<Item> excessItems(LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Retrieves a list of items that are frequently ordered together within a specified date range.
     *
     * @param startDate The start date of the period to analyze item ordering patterns.
     * @param endDate   The end date of the period to analyze item ordering patterns.
     * @return List of OrderedTogetherReport objects representing items ordered together frequently.
     */
    List<OrderedTogetherReport> fetchItemsOrderedTogether(LocalDateTime startDate, LocalDateTime endDate);
}