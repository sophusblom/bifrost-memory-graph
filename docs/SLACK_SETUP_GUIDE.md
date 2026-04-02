# Slack Setup Guide for OpenClaw Agents
_Written by Karen, 2026-03-28. For any agent being configured into a Slack workspace._

---

## What You Need Before You Start

Two tokens from api.slack.com/apps:
- `xoxb-...` — Bot User OAuth Token (from Install App)
- `xapp-...` — App-Level Token with `connections:write` scope (from Basic Information > App-Level Tokens)

Never put these in chat. Set them via SSH on the machine running OpenClaw:
```bash
openclaw config set channels.slack.botToken "xoxb-..."
openclaw config set channels.slack.appToken "xapp-..."
```

---

## Slack App Manifest

Create the app at api.slack.com/apps using "From a manifest". Use this:

```json
{
  "display_information": {
    "name": "YourAgentName"
  },
  "features": {
    "app_home": {
      "home_tab_enabled": false,
      "messages_tab_enabled": true,
      "messages_tab_read_only_enabled": false
    },
    "bot_user": {
      "display_name": "YourAgentName",
      "always_online": true
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "app_mentions:read",
        "channels:history",
        "channels:read",
        "chat:write",
        "files:read",
        "groups:history",
        "groups:read",
        "im:history",
        "im:read",
        "im:write",
        "reactions:write",
        "users:read"
      ]
    }
  },
  "settings": {
    "event_subscriptions": {
      "bot_events": [
        "app_mention",
        "message.channels",
        "message.groups",
        "message.im"
      ]
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": true,
    "is_hosted": false,
    "token_rotation_enabled": false
  }
}
```

Key things that must be set:
- `messages_tab_read_only_enabled: false` — otherwise DMs are disabled
- `socket_mode_enabled: true` — required for Socket Mode
- `messages_tab_enabled: true` — required for DMs to work

After saving the manifest, reinstall the app to the workspace. Every reinstall may rotate the bot token — always grab a fresh `xoxb-` after reinstalling.

---

## OpenClaw Config

The working Slack config block for `openclaw.json`:

```json
{
  "channels": {
    "slack": {
      "enabled": true,
      "mode": "socket",
      "botToken": "xoxb-...",
      "appToken": "xapp-...",
      "userTokenReadOnly": true,
      "dmPolicy": "open",
      "groupPolicy": "open",
      "allowFrom": ["*"],
      "nativeStreaming": true,
      "replyToMode": "all",
      "ackReaction": "eyes",
      "typingReaction": "writing_hand",
      "webhookPath": "/slack/events"
    }
  },
  "agents": {
    "defaults": {
      "typingMode": "instant"
    }
  }
}
```

Apply via `config.patch` — do not overwrite the full config.

---

## Key Settings Explained

| Setting | Value | Why |
|--------|-------|-----|
| `mode` | `socket` | Socket Mode — no public URL needed |
| `dmPolicy` | `open` | Allows all workspace members to DM |
| `groupPolicy` | `open` | Allows all channels (lock down to `allowlist` + `allowFrom` once live) |
| `allowFrom` | `["*"]` | Required when `dmPolicy: open` |
| `nativeStreaming` | `true` | Enables live Slack streaming API (`chat.startStream`) |
| `replyToMode` | `all` | Replies always in thread |
| `ackReaction` | `eyes` | Drops 👀 on message receipt |
| `typingReaction` | `writing_hand` | Shows ✍️ while processing |
| `typingMode` | `instant` | Live streaming line while generating |

---

## Common Failure Modes

**`invalid_auth` on startup**
- Token is wrong or stale. Reinstalling the Slack app rotates the bot token. Always fetch a fresh `xoxb-` from Install App after any reinstall.
- Duplicate tokens: check if tokens exist in both `channels.slack` AND `env` block. The `env` block takes precedence and may be stale. Remove it.

**Socket connects but no messages arrive**
- `groupPolicy: allowlist` with empty allowlist silently drops everything. Set to `open` for initial testing.
- `dmPolicy` not set to `open` with `allowFrom: ["*"]` blocks DMs.

**Messaging is turned off in DMs**
- In app manifest: `messages_tab_read_only_enabled` must be `false`. Save manifest, then reinstall.

**Progress line posts as a separate message instead of streaming**
- `streaming: "progress"` without `nativeStreaming: true` posts status as actual text. Use `nativeStreaming: true` with no explicit `streaming` value set, or set `streaming: "partial"`.
- `replyToMode: "first"` with `progress` mode causes the status to appear as a thread reply. Use `replyToMode: "all"` instead.

**Streaming line appears but doesn't disappear**
- Set `typingMode: "instant"` under `agents.defaults`.

---

## Formatting for Slack

Slack does not render standard markdown. Always use:
- `*bold*` not `**bold**`
- `_italic_` not `*italic*`
- `-` for bullet points, not `•` or `*`
- `*SECTION TITLE*` in caps instead of `# headers`
- Blank lines between sections
- No tables — use bullet lists instead

---

## Verification

After setup, run:
```bash
openclaw doctor --non-interactive
```

Look for `Slack: ok` in the channels section. Then check logs:
```bash
tail -20 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep -i slack
```

You want to see: `slack socket mode connected`

Then @mention the agent in any channel. If she responds, she's live.

---

_This guide reflects the working configuration as of 2026-03-28. If something breaks, start with the failure modes section._
