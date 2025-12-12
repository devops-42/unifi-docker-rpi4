{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:recommended"
  ],
  "lockFileMaintenance": {
    "enabled": true
  },
  "osvVulnerabilityAlerts": true,
  "dependencyDashboardOSVVulnerabilitySummary": "all",
  "addLabels": ["renovate", "{{{manager}}}"],
  {
    "packageRules": [
      {
        "matchDatasources": ["docker"]
      }
    ]
  },
  "customDatasources": {
      "unifi": {
        "defaultRegistryUrlTemplate": "https://community.ui.com/rss/releases/Releases/e6712595-81bb-4829-8e42-9e2630fabcfe",
        "format": "plain",
        "transformTemplates": [
          "{\"releases\": $map($.releases[version ~> /<title>(\\d+\\.\\d+\\.\\d+<\\/title>/], function ($v) { {\"version\": $replace($v.version, /<title>(\\d+\\.\\d+\\.\\d+<\\/title>/, \"$1\")} })}"
        ]
      }
    }
  "customManagers": [
    {
      "customType": "regex",
       "fileMatch": ["**/Dockerfile"],
       "matchStrings": [
         "renovate: datasource=(?<datasource>.*?) depName=(?<depName>\\S*)( versioning=(?<versioning>.*?))?( extractVersion=(?<extractVersion>.*?))?\\nARG .*?_VERSION=(?<currentValue>.*)\\s"
       ],
       "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}",
       "extractVersionTemplate": "{{#if (equals extractVersion 'true')}}^v(?<version>\\S+){{/if}}"
    },
    {
       "customType": "regex",
       "description": "Update Unifi network application",
       "fileMatch": ["**/Dockerfile"],
       "matchStrings": [
         "# renovate: datasource=(?<datasource>[a-z-.]+?) depName=(?<depName>.+?) versioning=(?<versioning>[^ ]+?)\\s+[a-z_]+\\s*=\\s*\"(?<currentValue>.+?)\""
       ]
    }
  ]
}