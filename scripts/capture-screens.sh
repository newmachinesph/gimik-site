#!/usr/bin/env bash
# Capture Gora app screenshots for the marketing site.
#
# Every image on this site must be the real app, not a drawing of it. This
# script makes that cheap: it drives a connected Android device over adb,
# navigates by deep link rather than by tapping coordinates (taps race with
# navigation and silently capture the previous screen), and forces SystemUI
# demo mode so the status bar is identical in every shot.
#
#   ./scripts/capture-screens.sh [output-dir]
#
# Then run `node scripts/process-screens.mjs` to crop and convert to webp.
set -euo pipefail

OUT="${1:-./screens-raw}"
PKG="com.sumnora.gora.v2"
DEVICE="${ANDROID_SERIAL:-$(adb devices | awk 'NR==2{print $1}')}"

if [ -z "$DEVICE" ]; then echo "No device. Plug a phone in and enable USB debugging." >&2; exit 1; fi
mkdir -p "$OUT"
echo "Device: $DEVICE  ->  $OUT"

# A fixed status bar. Without this every shot carries a different clock,
# battery level and whatever notifications happened to be pending.
demo() {
  adb -s "$DEVICE" shell settings put global sysui_demo_allowed 1 >/dev/null 2>&1
  for c in "enter" \
           "clock -e hhmm 0941" \
           "battery -e level 100 -e plugged false" \
           "network -e wifi show -e level 4 -e fully true" \
           "network -e mobile hide" \
           "notifications -e visible false"; do
    adb -s "$DEVICE" shell am broadcast -a com.android.systemui.demo -e command $c >/dev/null 2>&1
  done
}

grab() {  # grab <deep-link path> <output name>
  adb -s "$DEVICE" shell am start -a android.intent.action.VIEW -d "gora://$1" "$PKG" >/dev/null 2>&1
  adb -s "$DEVICE" shell "sleep 2.5"
  demo
  adb -s "$DEVICE" shell "sleep 0.8"
  adb -s "$DEVICE" exec-out screencap -p > "$OUT/$2.png"
  echo "  $2"
}

demo
grab discover 01-discover
grab home      02-somedays
grab activity  03-activity
grab invites   04-invites
grab profile   05-profile
grab messages  06-messages
grab friends   07-friends
grab groups    08-groups

# Detail screens have generated ids, so they are reached by opening the first
# row of a list we just deep-linked to. Verify these by eye after a UI change.
open_first_row() {  # open_first_row <list route> <x> <y> <name>
  adb -s "$DEVICE" shell am start -a android.intent.action.VIEW -d "gora://$1" "$PKG" >/dev/null 2>&1
  adb -s "$DEVICE" shell "sleep 2.5"
  adb -s "$DEVICE" shell input tap "$2" "$3"
  adb -s "$DEVICE" shell "sleep 3"
  demo
  adb -s "$DEVICE" shell "sleep 0.8"
  adb -s "$DEVICE" exec-out screencap -p > "$OUT/$4.png"
  echo "  $4"
}
open_first_row messages 539 390  09-thread
open_first_row discover 281 1032 10-someday

adb -s "$DEVICE" shell am broadcast -a com.android.systemui.demo -e command exit >/dev/null 2>&1
echo "Done. Now: node scripts/process-screens.mjs $OUT"
