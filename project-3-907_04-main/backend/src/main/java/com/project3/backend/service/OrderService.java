
package com.project3.backend.service;

import com.project3.backend.entity.Order;
import java.util.List;

/**
 * The {@code OrderService} interface defines operations for managing orders in the backend.
 * It provides methods to fetch, save, and delete orders.
 */
public interface OrderService {

    /**
     * Retrieves a list of all orders from the backend.
     *
     * @return A {@code List} of {@code Order} objects representing all orders.
     */
    List<Order> fetchAllOrders();

    /**
     * Saves an order in the backend.
     *
     * @param order The {@code Order} object to be saved.
     * @return The saved {@code Order} object.
     */
    Order saveOrder(Order order);

    /**
     * Deletes an order from the backend based on the provided ID.
     *
     * @param id The unique identifier of the order to be deleted.
     */
    void deleteOrder(int id);
}
