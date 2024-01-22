package com.project3.backend.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.ItemCategory;
import com.project3.backend.repository.ItemCategoryRepository;

/**
 * The {@code ItemCategoryServiceImpl} class represents the implementation of the {@link ItemCategoryService} interface.
 * It provides methods to interact with item categories using the {@link ItemCategoryRepository}.
 *
 * @author com.project3.backend.service
 * @version 1.0
 * @since 2023-12-06
 */
@Service
public class ItemCategoryServiceImpl implements ItemCategoryService {

    /**
     * The repository for accessing and managing {@link ItemCategory} entities.
     */
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    /**
     * Fetches all item categories from the repository.
     *
     * @return A list of {@link ItemCategory} entities representing the item categories.
     */
    public List<ItemCategory> fetchItemCategories() {
        return (List<ItemCategory>) itemCategoryRepository.findAll();
    }
}