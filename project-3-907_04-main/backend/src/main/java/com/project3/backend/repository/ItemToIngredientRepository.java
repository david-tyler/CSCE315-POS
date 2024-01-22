package com.project3.backend.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.project3.backend.entity.ItemToIngredient;

/**
 * The {@code ItemToIngredientRepository} interface defines the repository for managing
 * {@link com.project3.backend.entity.ItemToIngredient} entities in the database. It extends
 * {@link org.springframework.data.repository.CrudRepository}, providing basic CRUD operations.
 * The repository is annotated with {@link org.springframework.stereotype.Repository}.
 */
@Repository
public interface ItemToIngredientRepository extends CrudRepository<ItemToIngredient, Integer> {

    /**
     * Retrieves a list of {@code ItemToIngredient} entities based on the specified item ID.
     *
     * @param itemId The ID of the item.
     * @return A list of {@code ItemToIngredient} entities associated with the specified item ID.
     */
    List<ItemToIngredient> findByItemId(int itemId);

    /**
     * Retrieves a single {@code ItemToIngredient} entity based on the specified item and ingredient IDs.
     *
     * @param itemId       The ID of the item.
     * @param ingredientId The ID of the ingredient.
     * @return The {@code ItemToIngredient} entity associated with the specified item and ingredient IDs,
     *         or {@code null} if not found.
     */
    ItemToIngredient findByItemIdAndIngredientId(int itemId, int ingredientId);

    /**
     * Deletes all {@code ItemToIngredient} entities associated with the specified item ID.
     *
     * @param id The ID of the item for which associated entities should be deleted.
     */
    void deleteByItemId(int id);
}
