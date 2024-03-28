import React from "react";
import axios from "axios";
import Button from '../button/Button'

export default function Buy(/*recibir el id del usuario*/) {

  async function buy(/*id del usuario*/) {
    try {
      //En este caso esta hardcodeado al usuario "1111"
      const { data } = await axios.get("http://localhost:3001/cart/1111");
      const movies = await axios.post("http://localhost:3001/checkout", data);
      window.location = movies.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        callback={() => buy(/*id del usuario*/)}
        label="Buy"
        emoji="🤑"
      />
    </div>
  );
}
