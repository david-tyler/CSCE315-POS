package com.project3.backend.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.reports.IngredientToItemWithQuantity;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.reports.RestockReport;
import com.project3.backend.repository.IngredientRepository;

/**
 * Service implementation for managing ingredients.
 * This class provides methods for retrieving, saving, and deleting ingredients,
 * as well as fetching reports related to ingredient usage and restocking.
 */
@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    /**
     * Retrieves all ingredients.
     *
     * @return List of all ingredients.
     */
    public List<Ingredient> fetchIngredients() {
        return (List<Ingredient>) ingredientRepository.findAll();
    }

    /**
     * Retrieves a list of ingredients by their IDs.
     *
     * @param ids List of ingredient IDs.
     * @return List of ingredients matching the given IDs.
     */
    public List<Ingredient> fetchIngredientsById(List<Integer> ids) {
        return (List<Ingredient>) ingredientRepository.findAllById(ids);
    }

    /**
     * Saves a new ingredient or updates an existing one.
     *
     * @param ingredient The ingredient to be saved.
     * @return The saved ingredient.
     */
    public Ingredient saveIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    /**
     * Deletes an ingredient by its ID.
     *
     * @param id The ID of the ingredient to be deleted.
     */
    public void deleteIngredient(int id) {
        ingredientRepository.deleteById(id);
    }

    /**
     * Retrieves a list of ingredients with quantities for a given item ID.
     *
     * @param itemId The ID of the item.
     * @return List of ingredients with quantities for the specified item.
     */
    public List<IngredientToItemWithQuantity> fetchIngredientsByItemId(int itemId) {
        return ingredientRepository.findByItemToIngredients_itemId(itemId);
    }

    /**
     * Retrieves a list of ingredient usage reports between specified dates.
     *
     * @param startDate The start date for the report.
     * @param endDate   The end date for the report.
     * @return List of ingredient usage reports between the specified dates.
     */
    public List<IngredientUsageReport> fetchIngredientUsageBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return ingredientRepository.findIngredientUsageBetweenDates(startDate, endDate);
    }

    /**
     * Retrieves a list of restock reports for ingredients with stock less than restock threshold.
     *
     * @return List of restock reports.
     */
    public List<RestockReport> fetchStockLessThanRestock() {
        return ingredientRepository.findStockLessThanRestock();
    }
}
