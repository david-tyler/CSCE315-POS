package com.project3.backend.service;

import com.project3.backend.entity.ItemCategory;
import java.util.List;

/**
 * The {@code ItemCategoryService} interface declares methods to manage and retrieve information
 * related to item categories in the backend system.
 */
public interface ItemCategoryService {

    /**
     * Fetches a list of all item categories available in the system.
     *
     * @return A {@link List} of {@link ItemCategory} objects representing the available item categories.
     */
    List<ItemCategory> fetchItemCategories();
}
