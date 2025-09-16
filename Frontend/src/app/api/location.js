export const getAddressFromCoords = async (lat, long) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
    );
    if (!res.ok) throw new Error("Failed to fetch location");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
