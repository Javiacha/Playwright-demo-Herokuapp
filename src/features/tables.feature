@tables @regression
Feature: HTML Tables
  As a user
  I want to interact with sortable tables
  So that I can read and sort tabular data

  Background:
    Given I am on the tables page

  Scenario: Table 1 has the correct number of rows
    Then table 1 should have 4 rows

  Scenario: Table 2 has the correct number of rows
    Then table 2 should have 4 rows

  Scenario: Table 1 contains expected data
    Then table 1 row 1 column 1 should contain "Smith"

  Scenario: Sort table 1 by last name
    When I sort table 1 by column "Last Name"
    Then table 1 should have 4 rows

  Scenario: Sort table 1 by email
    When I sort table 1 by column "Email"
    Then table 1 should have 4 rows
