@checkboxes @forms @regression
Feature: Checkboxes interaction
  As a user
  I want to interact with checkboxes
  So that I can select and deselect options

  Background:
    Given I am on the checkboxes page

  Scenario: Page has two checkboxes
    Then there should be 2 checkboxes on the page

  Scenario: Check the first checkbox
    When I check checkbox number 1
    Then checkbox number 1 should be checked

  Scenario: Uncheck the second checkbox
    When I uncheck checkbox number 2
    Then checkbox number 2 should be unchecked

  Scenario: Check all checkboxes
    When I check checkbox number 1
    And I check checkbox number 2
    Then checkbox number 1 should be checked
    And checkbox number 2 should be checked
