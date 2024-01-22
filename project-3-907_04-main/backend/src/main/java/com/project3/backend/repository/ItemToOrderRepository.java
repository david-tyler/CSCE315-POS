package com.project3.backend.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project3.backend.entity.ItemToOrder;

/**
 * This interface defines the repository for managing {@link com.project3.backend.entity.ItemToOrder} entities.
 * It extends the {@link org.springframework.data.repository.CrudRepository} interface,
 * providing basic CRUD (Create, Read, Update, Delete) operations.
 */
@Repository
public interface ItemToOrderRepository extends CrudRepository<ItemToOrder, Integer> {

    /**
     * Retrieves a list of {@link com.project3.backend.entity.ItemToOrder} entities based on the specified order ID.
     *
     * @param orderId The ID of the order.
     * @return A list of {@link com.project3.backend.entity.ItemToOrder} entities associated with the given order ID.
     */
    List<ItemToOrder> findByOrderId(int orderId);

    /**
     * Retrieves a single {@link com.project3.backend.entity.ItemToOrder} entity based on the specified item ID and order ID.
     *
     * @param itemId  The ID of the item.
     * @param orderId The ID of the order.
     * @return The {@link com.project3.backend.entity.ItemToOrder} entity associated with the given item ID and order ID,
     *         or {@code null} if not found.
     */
    ItemToOrder findByItemIdAndOrderId(int itemId, int orderId);

    /**
     * Deletes all {@link com.project3.backend.entity.ItemToOrder} entities associated with the specified order ID.
     *
     * @param id The ID of the order for which items are to be deleted.
     */
    void deleteByOrderId(int id);
}
