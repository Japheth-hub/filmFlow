import React from "react";
import axios from "axios";
import Button from '../button/Button'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export default function Buy({sid,code,cart}) {
  async function buy() {
    try {
      const movies = await axios.post(`${NEXT_PUBLIC_URL}checkout`, {
        movies:cart,
        code:code,
        auth:sid
      });
      if(typeof window !== "undefined"){
        window.location = movies.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        callback={() => buy(sid)}
        label="Comprar"
        emoji="💲"
      />
    </div>
  );
}
