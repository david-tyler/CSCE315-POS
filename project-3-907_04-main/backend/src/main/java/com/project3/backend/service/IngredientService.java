
package com.project3.backend.service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.reports.IngredientToItemWithQuantity;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.reports.RestockReport;

import java.time.LocalDateTime;
import java.util.List;
/**
 * The {@code IngredientService} interface provides methods for managing and retrieving information related to ingredients.
 * It is part of the backend service layer in the project.
 */
public interface IngredientService {

    /**
     * Retrieves a list of all ingredients in the system.
     *
     * @return List of Ingredient objects representing all ingredients.
     */
    List<Ingredient> fetchIngredients();

    /**
     * Retrieves a list of ingredients based on the specified list of ingredient IDs.
     *
     * @param ids List of ingredient IDs.
     * @return List of Ingredient objects representing the specified ingredients.
     */
    List<Ingredient> fetchIngredientsById(List<Integer> ids);

    /**
     * Saves a new ingredient or updates an existing one in the system.
     *
     * @param ingredient The Ingredient object to be saved or updated.
     * @return The saved or updated Ingredient object.
     */
    Ingredient saveIngredient(Ingredient ingredient);

    /**
     * Deletes an ingredient from the system based on its ID.
     *
     * @param id The ID of the ingredient to be deleted.
     */
    void deleteIngredient(int id);

    /**
     * Retrieves a list of IngredientToItemWithQuantity objects representing the ingredients
     * associated with a specific item and their quantities.
     *
     * @param itemId The ID of the item to fetch ingredients for.
     * @return List of IngredientToItemWithQuantity objects.
     */
    List<IngredientToItemWithQuantity> fetchIngredientsByItemId(int itemId);

    /**
     * Retrieves a list of IngredientUsageReport objects representing ingredient usage
     * within the specified date range.
     *
     * @param startDate The start date of the date range.
     * @param endDate   The end date of the date range.
     * @return List of IngredientUsageReport objects.
     */
    List<IngredientUsageReport> fetchIngredientUsageBetweenDates(LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Retrieves a list of RestockReport objects representing ingredients with stock levels
     * less than the restock threshold.
     *
     * @return List of RestockReport objects.
     */
    List<RestockReport> fetchStockLessThanRestock();
}
