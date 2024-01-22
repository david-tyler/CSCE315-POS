package com.project3.backend.repository;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.Ingredient;
import com.project3.backend.reports.IngredientToItemWithQuantity;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.reports.RestockReport;

/**
 * Repository interface for managing Ingredient entities in the database.
 * Extends CrudRepository providing basic CRUD operations.
 */
@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Integer> {

    /**
     * Retrieves a list of ingredients with quantities associated with a specific item.
     *
     * @param itemId The ID of the item to retrieve ingredients for.
     * @return List of IngredientToItemWithQuantity objects.
     */
    @Query(value = "SELECT i.id, i.name, i.stock, i.restock, i.amount_ordered AS amountOrdered, i.price, i.gluten_free AS glutenFree, i.vegan, iti.quantity " +
                   "FROM ingredient i " +
                   "JOIN item_to_ingredient iti ON i.id = iti.ingredient_id " +
                   "JOIN item it ON it.id = iti.item_id " +
                   "WHERE it.id = :itemId", nativeQuery = true)
    List<IngredientToItemWithQuantity> findByItemToIngredients_itemId(int itemId);
    
    /**
     * Retrieves a list of IngredientUsageReport objects representing ingredient usage between specified dates.
     *
     * @param startDate The start date for the period.
     * @param endDate The end date for the period.
     * @return List of IngredientUsageReport objects.
     */
    @Query(value = "SELECT i.name AS ingredientName, SUM(iti.quantity) AS amountUsed " +
                   "FROM \"order\" O " +
                   "JOIN \"item_to_order\" ito ON ito.order_id = O.id " +
                   "JOIN \"item_to_ingredient\" iti ON iti.item_id = ito.item_id " +
                   "JOIN \"ingredient\" i ON i.id = iti.ingredient_id " +
                   "WHERE O.time BETWEEN :startDate AND :endDate " +
                   "GROUP BY i.name " +
                   "ORDER BY i.name", nativeQuery = true)
    List<IngredientUsageReport> findIngredientUsageBetweenDates(@Param("startDate") LocalDateTime startDate, 
                                                                @Param("endDate") LocalDateTime endDate);

    /**
     * Retrieves a list of ingredients that need restocking, along with the restock amount.
     *
     * @return List of RestockReport objects.
     */
    @Query(value = "SELECT new com.project3.backend.entity.Ingredient(i.id, i.name, i.stock, i.restock, i.amountOrdered, i.price, i.glutenFree, i.vegan) AS ingredient, (i.restock - i.stock) AS restockAmount FROM Ingredient AS i WHERE i.stock < i.restock")
    List<RestockReport> findStockLessThanRestock();
}

