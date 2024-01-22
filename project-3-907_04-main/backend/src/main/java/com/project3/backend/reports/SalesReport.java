
package com.project3.backend.reports;
/**
 * The {@code SalesReport} interface represents a sales report with information about
 * a specific item's name and the corresponding order count.
 */
public interface SalesReport {

    /**
     * Returns the name of the item associated with the sales report.
     *
     * @return the name of the item
     */
    String getItemName();

    /**
     * Returns the count of orders for the item associated with the sales report.
     *
     * @return the order count for the item
     */
    int getOrderCount();
}
