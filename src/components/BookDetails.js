import { Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { app } from "../base";
import { AuthContext } from "./AuthRoute";

const BookDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const [view, setView] = useState([]);

  const viewData = async () => {
    await app
      .firestore()
      .collection("books")
      .doc(id)
      .get()
      .then((doc) => {
        setView(doc.data());
      });
  };

  useEffect(() => {
    viewData();
  }, []);

  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        The Book Details: {id}
      </div>
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        The Book Details: {view && view.name}
      </div>
      <img
        src={view && view.bookCover}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px 10px 0 0",
        }}
      />
      <div>
        {currentUser ? (
          <Button
            type="primary"
            danger
            style={{
              width: "100%",
            }}
            onClick={() => {
              console.log("download");
            }}
          >
            <a
              href={view && view.book}
              download="My_File.pdf"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              {" "}
              Download Here Now{" "}
            </a>
          </Button>
        ) : (
          <Link to="/register">
            <Button
              type="primary"
              danger
              style={{
                width: "100%",
              }}
              onClick={() => {
                console.log("download");
              }}
            >
              <a> Register now to Download Here </a>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
