"use client";

import { useEffect, useState } from "react";

export function useSectionState<T>(section: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/state?section=${section}`)
      .then((res) => (res.ok ? res.json() : { data: null }))
      .then((body) => {
        if (!cancelled && body?.data) setData(body.data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [section]);

  const save = (next: T) => {
    setData(next);
    fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data: next }),
    }).catch(() => {});
  };

  return { data, save, loaded };
}
