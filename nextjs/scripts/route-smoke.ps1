#requires -Version 5.1
<#
.SYNOPSIS
  Route smoke test against a running server.

.DESCRIPTION
  Requests a fixed set of routes and checks each returned status code against
  its expected value. Valid routes must return 200; the unknown job slug must
  return 404. Prints "route -> status" for each and exits non-zero on mismatch.

.PARAMETER BaseUrl
  Base URL of the running server. Defaults to http://localhost:3001.
#>

param(
    [string]$BaseUrl = "http://localhost:3001"
)

$ErrorActionPreference = 'Stop'

# route -> expected status
$routes = [ordered]@{
    "/"                                        = 200
    "/vacancies"                               = 200
    "/jobs/senior-recruitment-consultant"      = 200
    "/vacancies/senior-recruitment-consultant" = 200
    "/apply"                                    = 200
    "/contact"                                  = 200
    "/candidates"                               = 200
    "/employers"                                = 200
    "/about"                                    = 200
    "/request-staff"                            = 200
    "/dashboard"                                = 200
    "/dashboard/candidates"                     = 200
    "/dashboard/employers"                      = 200
    "/jobs/unknown-job-slug"                    = 404
}

$failures = 0

foreach ($route in $routes.Keys) {
    $expected = $routes[$route]
    $url = "$BaseUrl$route"
    $status = 0

    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Method Get -MaximumRedirection 0 -ErrorAction Stop
        $status = [int]$response.StatusCode
    } catch [System.Net.WebException] {
        if ($_.Exception.Response) {
            $status = [int]$_.Exception.Response.StatusCode
        } else {
            $status = -1
        }
    } catch {
        # PowerShell 5.1 surfaces non-2xx as terminating errors; pull the status if present.
        if ($_.Exception.Response) {
            $status = [int]$_.Exception.Response.StatusCode
        } else {
            $status = -1
        }
    }

    if ($status -eq $expected) {
        $mark = "OK"
    } else {
        $mark = "FAIL (expected $expected)"
        $failures++
    }

    Write-Host ("{0,-45} -> {1}  {2}" -f $route, $status, $mark)
}

Write-Host ""
if ($failures -gt 0) {
    Write-Host "Route smoke FAILED: $failures mismatch(es)."
    exit 1
} else {
    Write-Host "Route smoke PASSED."
    exit 0
}
