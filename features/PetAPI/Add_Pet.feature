Feature: Deposit to wallet
  In order to achieve my goals
  As a username
  I want to be able to make a withdraw

  Scenario: Add a pet
    #Generates Json object
    Given I have a pet for sale
    #Sends request
    When I put that pet up for sale
    #Verifies response was correct
    Then The deposit is successful