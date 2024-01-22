package com.project3.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.project3.backend.entity.Ingredient;
import com.project3.backend.entity.Item;
import com.project3.backend.entity.ItemCategory;
import com.project3.backend.entity.Order;
import com.project3.backend.entity.User;
import com.project3.backend.reports.IngredientToItemWithQuantity;
import com.project3.backend.reports.IngredientUsageReport;
import com.project3.backend.reports.ItemToOrderWithQuantity;
import com.project3.backend.reports.OrderedTogetherReport;
import com.project3.backend.reports.RestockReport;
import com.project3.backend.reports.SalesReport;
import com.project3.backend.service.IngredientServiceImpl;
import com.project3.backend.service.ItemCategoryServiceImpl;
import com.project3.backend.service.ItemServiceImpl;
import com.project3.backend.service.OrderServiceImpl;
import com.project3.backend.service.UserServiceImpl;

/**
 * This class is the controller for handling database-related operations.
 */
@RestController
public class DatabaseController {
    @Autowired
    private ItemServiceImpl itemService;
    @Autowired
    private IngredientServiceImpl ingredientService;
    @Autowired
    private ItemCategoryServiceImpl itemCategoryService;
    @Autowired
    private OrderServiceImpl orderService;
    @Autowired
    private UserServiceImpl userService;

    /**
     * Retrieves the menu items from the database.
     *
     * @return a list of menu items
     */
    @GetMapping("/menuItems")
    public List<Item> getMenuItems() {
        return itemService.fetchMenuItems();
    }

    /**
        * Retrieves a list of item categories.
        *
        * @return The list of item categories.
        */
    @GetMapping("/itemCategories")
    public List<ItemCategory> getItemCategories() {
        return itemCategoryService.fetchItemCategories();
    }

    /**
        * Retrieves a list of all orders.
        *
        * @return the list of orders
        */
    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderService.fetchAllOrders();
    }

    /**
        * Retrieves a list of ingredients from the database.
        *
        * @return the list of ingredients
        */
    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() {
        return ingredientService.fetchIngredients();
    }

    /**
     * Retrieves a list of IngredientToItemWithQuantity objects representing the ingredients
     * associated with a given item ID.
     *
     * @param itemId the ID of the item
     * @return a list of IngredientToItemWithQuantity objects
     */
    @GetMapping("/itemToIngredient")
    public List<IngredientToItemWithQuantity> getIngredientsByItemId(@RequestParam int itemId) {
        return ingredientService.fetchIngredientsByItemId(itemId);
    }

    /**
     * Retrieves a list of ItemToOrderWithQuantity objects based on the provided order ID.
     *
     * @param orderId the ID of the order
     * @return a list of ItemToOrderWithQuantity objects
     */
    @GetMapping("/itemToOrder")
    public List<ItemToOrderWithQuantity> getItemsByOrderId(@RequestParam int orderId) {
        return itemService.fetchItemsByOrderId(orderId);
    }

    /**
        * Retrieves a list of users from the database.
        *
        * @return the list of users
        */
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.fetchUsers();
    }
    
    /**
        * Saves an item to the database.
        *
        * @param item The item to be saved.
        * @return The saved item.
        */
    @PostMapping("/menuItems")
    public Item saveItem(@RequestBody Item item) {
        System.out.println("Saving item: " + item.toString());
        return itemService.saveItem(item);
    }

    /**
        * Saves an ingredient to the database.
        *
        * @param ingredient the ingredient to be saved
        * @return the saved ingredient
        */
    @PostMapping("/ingredients")
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        System.out.println("Saving ingredient: " + ingredient.toString());
        return ingredientService.saveIngredient(ingredient);
    }

    /**
        * Saves an order in the database.
        *
        * @param order the order to be saved
        * @return the saved order
        */
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody Order order) {
        System.out.println("Saving order: " + order.toString());
        return orderService.saveOrder(order);
    }


    /**
     * Saves a user to the database.
     * 
     * @param user the user to be saved
     * @return the saved user
     */
    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        System.out.println("Saving user: " + user.toString());
        return userService.saveUser(user);
    }

    /**
     * Deletes an item from the menu based on the provided ID.
     *
     * @param id the ID of the item to be deleted
     */
    @DeleteMapping("/menuItems")
    public void deleteItem(@RequestParam int id) {
        itemService.deleteItem(id);
    }

    /**
     * Deletes an ingredient from the database.
     *
     * @param id the ID of the ingredient to be deleted
     */
    @DeleteMapping("/ingredients")
    public void deleteIngredient(@RequestParam int id) {
        ingredientService.deleteIngredient(id);
    }

    /**
     * Deletes an order with the specified ID.
     *
     * @param id the ID of the order to be deleted
     */
    @DeleteMapping("/orders")
    public void deleteOrder(@RequestParam int id) {
        orderService.deleteOrder(id);
    }

    /**
     * Deletes a user from the database.
     *
     * @param id the ID of the user to be deleted
     */
    @DeleteMapping("/users")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }

    /**
     * Retrieves the sales report for a given time period.
     * 
     * @param startDate The start date and time of the time period.
     * @param endDate The end date and time of the time period.
     * @return The list of sales reports within the specified time period.
     */
    @GetMapping("/salesReport")
    public List<SalesReport> getSalesReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.salesReport(startDate, endDate);
    }

    /**
     * Retrieves the ingredient usage report between the specified start and end dates.
     *
     * @param startDate The start date and time for the report.
     * @param endDate The end date and time for the report.
     * @return A list of IngredientUsageReport objects representing the ingredient usage within the specified date range.
     */
    @GetMapping("/ingredientUsageReport")
    public List<IngredientUsageReport> getIngredientUsageReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ingredientService.fetchIngredientUsageBetweenDates(startDate, endDate);
    }

    /**
     * Retrieves a list of excess items within a specified date range.
     * 
     * @param startDate The start date of the date range.
     * @param endDate The end date of the date range.
     * @return A list of excess items within the specified date range.
     */
    @GetMapping("/excessItems")
    public List<Item> getExcessItems(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.excessItems(startDate, endDate);
    }

    /**
        * Retrieves the restock report by fetching the ingredients with stock levels less than the restock threshold.
        *
        * @return a list of RestockReport objects representing the ingredients that need to be restocked.
        */
    @GetMapping("/restockReport")
    public List<RestockReport> getRestockReport() {
        return ingredientService.fetchStockLessThanRestock();
    }

    /**
     * Retrieves a list of items that are frequently ordered together within a specified time range.
     *
     * @param startDate the start date and time of the time range
     * @param endDate the end date and time of the time range
     * @return a list of OrderedTogetherReport objects representing the items frequently ordered together
     */
    @GetMapping("/orderedTogether")
    public List<OrderedTogetherReport> getOrderedTogether(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, 
                                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return itemService.fetchItemsOrderedTogether(startDate, endDate);
    }

    /**
     * Retrieves the login information for the authenticated user.
     * 
     * @param authentication the authentication object containing user information
     * @return a map containing the user's name and role
     */
    @GetMapping("/auth/login")
    public Map<String, String> getLoginInfo(Authentication authentication) {
        JwtAuthenticationToken clientAuthentication = (JwtAuthenticationToken) authentication;
        System.out.println("Client authentication: " + clientAuthentication.toString());
        String name = authentication.getName();
        Optional<? extends GrantedAuthority> roleOptional = authentication.getAuthorities().stream().findFirst();
        String role = roleOptional.isPresent() ? roleOptional.get().getAuthority() : "";
        return Map.of("user", name, "role", role);
    }
}
