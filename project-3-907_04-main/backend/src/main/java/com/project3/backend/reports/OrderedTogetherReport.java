package com.project3.backend.reports;
/**
 * The {@code OrderedTogetherReport} interface represents a report that provides information
 * about items that are ordered together.
 */
public interface OrderedTogetherReport {

    /**
     * Retrieves the name of the first item in the ordered pair.
     *
     * @return The name of the first item.
     */
    String getItem1Name();

    /**
     * Retrieves the name of the second item in the ordered pair.
     *
     * @return The name of the second item.
     */
    String getItem2Name();

    /**
     * Retrieves the count of times the pair of items has been ordered together.
     *
     * @return The count of times the pair has been ordered together.
     */
    int getPairCount();
}
