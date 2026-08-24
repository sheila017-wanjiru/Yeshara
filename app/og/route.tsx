import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Per-route Open Graph images.
 *
 * COLOUR EXCEPTION: this is the one place literal hex is correct.
 * next/og renders through Satori in an isolated context with no
 * stylesheet and no CSS custom properties, so var(--tq-300) resolves to
 * nothing here. The values below are copies of the token ramp; if the
 * ramp in app/globals.css changes, change them too.
 *
 * The previous site used one 440x437 PNG as header logo, favicon, OG
 * image and Twitter card simultaneously, so every shared link looked
 * identical and none of them said what page it was. Each route now
 * generates its own card from its own title.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Yeshara Tokens Limited").slice(0, 110);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 180);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px",
          // The token ramp, inlined: next/og renders in an isolated
          // context with no access to the stylesheet.
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 900,
            height: 760,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(82,184,188,0.20), rgba(0,0,0,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "linear-gradient(135deg, #CDEEEF, #3E9B9E 76%, #17403F)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            Yeshara
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.032em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                color: "#BFC0C0",
                lineHeight: 1.45,
                maxWidth: 940,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #282A2A",
            paddingTop: 28,
            fontSize: 20,
            color: "#989A9A",
            letterSpacing: "0.08em",
          }}
        >
          <div style={{ display: "flex" }}>WWW.YESHARA.COM</div>
          <div style={{ display: "flex", color: "#91D2D4" }}>
            REAL-WORLD ASSET TOKENIZATION · KENYA
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
