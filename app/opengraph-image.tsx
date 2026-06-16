import { ImageResponse } from "next/og";

// Pre-generated social card (spec §8, 1200×630). Y2K retro-window chrome on the
// dark palette: a titled "window" framing the name in the display font with the
// positioning tagline beneath. DRAFT — Psy approves at Gate 7. The Bungee fetch
// is wrapped so a network hiccup at build degrades to the default font rather
// than failing the build.
export const runtime = "nodejs";
export const alt =
  "Sai Surendra — Co-founder @ Invexs AI, incoming MS Econ @ Georgia Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadBungee(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Bungee",
      // An old UA forces Google to serve a TTF (satori can't parse woff2).
      { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X)" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const bungee = await loadBungee();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#16161f",
          padding: 56,
          fontFamily: bungee ? "Bungee" : "sans-serif",
        }}
      >
        {/* Retro window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "5px solid #f0edf8",
            borderRadius: 8,
            backgroundColor: "#211f2e",
            boxShadow: "14px 14px 0 0 rgba(22,214,230,0.65)",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#7c5cff",
              padding: "16px 22px",
            }}
          >
            <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, backgroundColor: "#ff6b6b" }} />
            <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, backgroundColor: "#ffd23f" }} />
            <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, backgroundColor: "#c6ff3e" }} />
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                fontFamily: "sans-serif",
                fontSize: 26,
                color: "#f0edf8",
                letterSpacing: 1,
              }}
            >
              sai_surendra.exe
            </div>
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", padding: "54px 56px 60px" }}>
            <div
              style={{
                display: "flex",
                fontSize: 128,
                lineHeight: 1,
                color: "#f0edf8",
                letterSpacing: 2,
              }}
            >
              SAI SURENDRA
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 34,
                fontFamily: "sans-serif",
                fontSize: 33,
                color: "#b9b4cc",
              }}
            >
              Co-founder @ Invexs AI · Incoming MS Econ @ Georgia Tech
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
              <div style={{ display: "flex", width: 26, height: 26, backgroundColor: "#16d6e6" }} />
              <div style={{ display: "flex", width: 26, height: 26, backgroundColor: "#7c5cff" }} />
              <div style={{ display: "flex", width: 26, height: 26, backgroundColor: "#c6ff3e" }} />
              <div
                style={{
                  display: "flex",
                  marginLeft: 10,
                  fontFamily: "sans-serif",
                  fontSize: 26,
                  letterSpacing: 4,
                  color: "#7ee787",
                  textTransform: "uppercase",
                }}
              >
                fun person, serious work
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bungee
        ? [{ name: "Bungee", data: bungee, style: "normal", weight: 400 }]
        : [],
    },
  );
}
