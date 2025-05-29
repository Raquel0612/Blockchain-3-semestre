'use client';

import { useEffect } from "react";

import "./css/globals.css";
import "./css/home.css";

export default function Page() {
  useEffect(() => {
    minhaFuncao();
  }, []);

  function minhaFuncao() {
    if (document.cookie.indexOf("logado") < 0) {
      window.location.href = "/login";
    }
    else {
        window.location.href = "/home";
    }
  }
}