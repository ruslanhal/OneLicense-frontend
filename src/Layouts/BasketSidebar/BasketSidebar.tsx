import { useSearch } from "@/apiClient/contexts/SearchContext";
import {
  getCart,
  removeImageFromCart,
} from "@/apiClient/services/cart/cart.service";
import Button from "@/components/Button/Button";
import CartItem from "@/components/CartItem/CartItem";
import React, { useEffect, useState } from "react";
import { X } from "react-feather";

interface BasketSideBarProps {
  close: (value: boolean) => void;
}

export default function BasketSidebar({ close }: BasketSideBarProps) {
  const [cartList, setCartList] = useState([]);
  const { setCartLength, cartLength } = useSearch();

  const handleDelete = async (id: string) => {
    setCartList((prevCartList) =>
      prevCartList.filter((item) => item.id !== id)
    );
    const response = await removeImageFromCart(id);
    console.log(response);

    setCartLength(cartLength - 1);

    console.log(response);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    close(false);
  };

  const handleSidebarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleGetImagesFromCart = async () => {
      try {
        const response = await getCart();
        console.log("API response:", response);

        if (response && response.cartProject) {
          const cartProjectImages = response.cartProject.flatMap((project) => {
            const projectTitle = project.project?.title;

            return (project.cartProjectImage || []).map((cartProjectImage) => ({
              id: cartProjectImage.id,
              price: cartProjectImage.image.price,
              image: cartProjectImage.image.thumbnailUrl,
              currency: cartProjectImage.image.currency,
              title: cartProjectImage.image.title,
              projectTitle,
            }));
          });

          setCartList(cartProjectImages);
        } else {
          setCartList([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCartList([]);
      }
    };
    handleGetImagesFromCart();
  }, []);

  const subtotal = cartList
    .reduce((sum, item) => sum + parseFloat(item.price || "0"), 0)
    .toFixed(2);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] bg-black bg-opacity-30 z-[2000]"
      onClick={handleOverlayClick}
    >
      <div
        className="fixed right-0 top-0 bottom-0 bg-[#f2f2f2] w-[300px] shadow-lg p-4 flex flex-col"
        onClick={handleSidebarClick}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold">Your cart - {cartList.length} items</div>
          <X className="h-[20px] cursor-pointer" onClick={() => close(false)} />
        </div>

        <div className="flex flex-col gap-1">
          {cartList.length > 0 ? (
            cartList
              .reduce((acc: any[], item) => {
                const existingProject = acc.find(
                  (project) => project.projectTitle === item.projectTitle
                );

                if (existingProject) {
                  existingProject.images.push(item);
                } else {
                  acc.push({
                    projectTitle: item.projectTitle,
                    images: [item],
                  });
                }

                return acc;
              }, [])
              .map((project, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="font-semibold">{project.projectTitle}</div>
                  {project.images.map((image, iIndex) => (
                    <CartItem
                      key={iIndex}
                      id={image.id}
                      title={image.title}
                      price={image.price}
                      image={image.url}
                      currency={image.currency}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              ))
          ) : (
            <div className="text-center mt-4">Your cart is empty</div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 text-sm font-semibold">
          <div>Subtotal</div>
          <div>${subtotal} AUD</div>
        </div>

        <div className="mt-5">
          <Button text="Check Out" styleType="button_dark" width="100%" />
        </div>
      </div>
    </div>
  );
}
