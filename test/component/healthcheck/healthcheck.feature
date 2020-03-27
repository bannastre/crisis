Feature: Healthchecks

  Scenario Outline: I can ping the service
    When I call "GET" "/crisis/healthcheck/ping"
    Then I should get the expected status code 200


    Examples:
      | status |
      | 200    |

  Scenario Outline: I can understand the readiness of the service
    When I call "GET" "/crisis/healthcheck/ready"
    Then I should get the expected status code 200


    Examples:
      | status |
      | 200    |