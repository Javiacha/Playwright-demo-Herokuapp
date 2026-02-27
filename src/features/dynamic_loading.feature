@dynamic @regression
Feature: Dynamic Loading
  As a user
  I want to interact with dynamically loaded content
  So that I can verify async behaviour is handled correctly

  Scenario: Wait for dynamically loaded element - Example 1
    Given I am on the dynamic loading page example 1
    When I click the start button
    And I wait for the content to load
    Then I should see the text "Hello World!"

  Scenario: Wait for dynamically loaded element - Example 2
    Given I am on the dynamic loading page example 2
    When I click the start button
    And I wait for the content to load
    Then I should see the text "Hello World!"
