@alerts @smoke @regression
Feature: JavaScript Alerts
  As a user
  I want to interact with browser alerts, confirms and prompts
  So that I can handle all types of dialog interactions

  Background:
    Given I am on the javascript alerts page

  @smoke
  Scenario: Accept a simple JS alert
    When I trigger and accept the JS alert
    Then the result should contain "You successfully clicked an alert"

  @regression
  Scenario: Accept a JS confirm dialog
    When I trigger and accept the JS confirm
    Then the result should contain "You clicked: Ok"

  @regression
  Scenario: Dismiss a JS confirm dialog
    When I trigger and dismiss the JS confirm
    Then the result should contain "You clicked: Cancel"

  @regression
  Scenario: Enter text in a JS prompt
    When I trigger the JS prompt and type "Manowar Rules"
    Then the result should contain "You entered: Manowar Rules"
