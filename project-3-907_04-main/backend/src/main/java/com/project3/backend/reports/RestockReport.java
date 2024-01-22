
package com.project3.backend.reports;

import com.project3.backend.entity.Ingredient;
/**
 * The {@code RestockReport} interface represents a report for restocking a specific ingredient.
 * It provides methods to retrieve information about the ingredient and the restock amount.
 */
public interface RestockReport {

    /**
     * Retrieves the ingredient associated with this restock report.
     *
     * @return The {@code Ingredient} object representing the ingredient to be restocked.
     */
    Ingredient getIngredient();

    /**
     * Retrieves the amount of the ingredient to be restocked.
     *
     * @return The restock amount as an integer value.
     */
    int getRestockAmount();
}
