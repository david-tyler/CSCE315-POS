package com.project3.backend.reports;

/**
 * The {@code IngredientUsageReport} interface represents a report on the usage
 * of a particular ingredient. It provides methods to retrieve information
 * about the ingredient name and the amount used.
 */
public interface IngredientUsageReport {

    /**
     * Returns the name of the ingredient associated with this report.
     *
     * @return The name of the ingredient.
     */
    String getIngredientName();

    /**
     * Returns the amount of the ingredient used, represented as an integer.
     *
     * @return The amount of the ingredient used.
     */
    int getAmountUsed();
}
