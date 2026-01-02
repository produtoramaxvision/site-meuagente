import React from "react";
import TransparentCheckout from "@/components/checkout/TransparentCheckout";
import SEO from "@/components/SEO";

const CheckoutPage = () => {
  return (
    <>
      <SEO
        title="Checkout Seguro - Meu Agente"
        description="Finalize sua assinatura do Meu Agente de forma segura."
        canonicalUrl="/checkout"
      />
      <TransparentCheckout />
    </>
  );
};

export default CheckoutPage;
