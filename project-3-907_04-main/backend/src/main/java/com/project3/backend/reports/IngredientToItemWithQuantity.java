
package com.project3.backend.reports;
/**
 * The {@code IngredientToItemWithQuantity} interface represents an item with associated
 * ingredient details and quantity information.
 */
public interface IngredientToItemWithQuantity {
    /**
     * Retrieves the unique identifier of the item.
     *
     * @return The item's ID.
     */
    int getId();

    /**
     * Retrieves the name of the item.
     *
     * @return The item's name.
     */
    String getName();

    /**
     * Retrieves the current stock level of the item.
     *
     * @return The current stock level.
     */
    int getStock();

    /**
     * Retrieves the restock level of the item.
     *
     * @return The restock level.
     */
    int getRestock();

    /**
     * Retrieves the total amount ordered for the item.
     *
     * @return The total amount ordered.
     */
    int getAmountOrdered();

    /**
     * Retrieves the price of the item.
     *
     * @return The item's price.
     */
    double getPrice();

    /**
     * Checks if the item is gluten-free.
     *
     * @return {@code true} if the item is gluten-free, {@code false} otherwise.
     */
    boolean getGlutenFree();

    /**
     * Checks if the item is vegan.
     *
     * @return {@code true} if the item is vegan, {@code false} otherwise.
     */
    boolean getVegan();

    /**
     * Retrieves the quantity of the item.
     *
     * @return The quantity of the item.
     */
    int getQuantity();
}
