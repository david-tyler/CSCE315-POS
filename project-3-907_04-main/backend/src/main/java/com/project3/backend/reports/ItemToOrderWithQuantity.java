package com.project3.backend.reports;

/**
 * The {@code ItemToOrderWithQuantity} interface represents an item with additional
 * information for ordering, including its ID, name, price, dietary information,
 * category ID, size, extra sauce option, image URL, and quantity.
 */
public interface ItemToOrderWithQuantity {

    /**
     * Gets the unique identifier of the item.
     *
     * @return The ID of the item.
     */
    int getId();

    /**
     * Gets the name of the item.
     *
     * @return The name of the item.
     */
    String getName();

    /**
     * Gets the price of the item.
     *
     * @return The price of the item.
     */
    double getPrice();

    /**
     * Checks if the item is suitable for vegans.
     *
     * @return {@code true} if the item is vegan, {@code false} otherwise.
     */
    boolean getVegan();

    /**
     * Checks if the item is gluten-free.
     *
     * @return {@code true} if the item is gluten-free, {@code false} otherwise.
     */
    boolean getGlutenFree();

    /**
     * Gets the category ID of the item.
     *
     * @return The category ID of the item.
     */
    int getCategoryId();

    /**
     * Gets the size of the item.
     *
     * @return The size of the item.
     */
    String getSize();

    /**
     * Checks if extra sauce is requested for the item.
     *
     * @return {@code true} if extra sauce is requested, {@code false} otherwise.
     */
    boolean getExtraSauce();

    /**
     * Gets the URL of the image associated with the item.
     *
     * @return The image URL of the item.
     */
    String getImageUrl();

    /**
     * Gets the quantity of the item to be ordered.
     *
     * @return The quantity of the item.
     */
    int getQuantity();
}
