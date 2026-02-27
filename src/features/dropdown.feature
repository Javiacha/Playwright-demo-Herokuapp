@dropdown @forms @regression
Feature: Dropdown selection
  As a user
  I want to select options from a dropdown
  So that I can choose between available options

  Background:
    Given I am on the dropdown page

  Scenario: Select Option 1 from dropdown
    When I select option with value "1"
    Then the selected value should be "1"

  Scenario: Select Option 2 from dropdown
    When I select option with value "2"
    Then the selected value should be "2"

  Scenario: Select option by label
    When I select option with label "Option 1"
    Then the selected value should be "1"
