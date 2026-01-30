// utils/device.js
export function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID(); // 최신 브라우저 지원
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}
