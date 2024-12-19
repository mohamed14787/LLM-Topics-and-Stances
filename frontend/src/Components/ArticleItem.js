import { Button } from "flowbite-react";

export default function ArticleItem({ title }) {
  return (
    <div>
      <div
        style={{
          backgroundColor: "darkgrey",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "5px",
          alignItems: "center",
          paddingBottom: "5px",
        }}
      >
        <a
          href="#"
          className="inline-block rounded-lg active"
          aria-current="page"
          style={{
            width: "auto",
            height: "30px",
            backgroundColor: "lightgrey",
            borderRadius: "20px / 50%",
            padding: "5px",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: "14px",
            color: "#000",
            alignContent: "center",
          }}
        >
          {title}
        </a>
        <Button variant="contained" style={{ backgroundColor: "#333" }}>
          <a
            href="https://www.cnn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to the Article
          </a>
        </Button>
      </div>

      <div style={{ textAlign: "left" }}>
        <p style={{ fontSize: "25px", padding: "10px" }}>
          Bashar al-Assad: The Syrian President's first visit to the UAE in over
          a decade
        </p>

        <p style={{ fontSize: "15px", padding: "10px" }}>
          Bashar al-Assad, the Syrian President, visited the United Arab
          Emirates on Friday, marking his first visit to the country in over a
          decade. The visit comes as the UAE seeks to improve its relations with
          the Syrian government, which has been isolated by much of the
          international community due to its brutal crackdown on pro-democracy
          protests that began in 2011.
        </p>

        <p style={{ fontSize: "13px", padding: "10px" }}>5 days ago</p>
      </div>
    </div>
  );
}
