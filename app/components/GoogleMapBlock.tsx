"use client";

import { useEffect, useMemo, useState } from "react";

type GoogleMapBlockProps = {
  title: string;
  query: string;
  zoom?: number;
};

type TrackingStatus = "idle" | "tracking" | "denied" | "unsupported";

function mapUrl(query: string, zoom: number) {
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    output: "embed",
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

export default function GoogleMapBlock({
  title,
  query,
  zoom = 10,
}: GoogleMapBlockProps) {
  const [trackingStatus, setTrackingStatus] = useState<TrackingStatus>("idle");
  const [watchId, setWatchId] = useState<number | null>(null);
  const [currentQuery, setCurrentQuery] = useState(query);

  const src = useMemo(() => {
    const activeZoom = trackingStatus === "tracking" ? 14 : zoom;
    return mapUrl(currentQuery, activeZoom);
  }, [currentQuery, trackingStatus, zoom]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setWatchId(null);
    setTrackingStatus("idle");
    setCurrentQuery(query);
  };

  const startTracking = () => {
    if (!("geolocation" in navigator)) {
      setTrackingStatus("unsupported");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentQuery(`${latitude},${longitude}`);
        setTrackingStatus("tracking");
      },
      () => {
        setTrackingStatus("denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 12000,
      },
    );

    setWatchId(id);
  };

  const isTracking = trackingStatus === "tracking";

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-100">
      <div className="relative h-[300px] md:h-[400px]">
        <iframe
          title={`${title} Google map`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white px-4 py-3">
        <p className="text-sm text-gray-600">
          {isTracking
            ? "Showing your current location"
            : "Showing tour location on Google Maps"}
        </p>

        <button
          type="button"
          onClick={isTracking ? stopTracking : startTracking}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          {isTracking ? "Back to tour map" : "Track my location"}
        </button>
      </div>

      {trackingStatus === "denied" && (
        <p className="bg-white px-4 pb-3 text-sm text-red-600">
          Location access was denied. Please allow location in your browser to use tracking.
        </p>
      )}

      {trackingStatus === "unsupported" && (
        <p className="bg-white px-4 pb-3 text-sm text-red-600">
          Your browser does not support location tracking.
        </p>
      )}
    </div>
  );
}
