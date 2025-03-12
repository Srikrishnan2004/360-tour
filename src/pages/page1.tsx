import React, { useState, useRef, startTransition } from "react";
import { useNavigate } from "react-router";
import { Pannellum } from "pannellum-react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "@google/model-viewer";
import "./style.css";

const Page1 = () => {
  let navigate = useNavigate();
  const [image] = useState("/KOL.jpg");
  const panImage = useRef(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("pictures");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Pannellum
        width="100%"
        height="100vh"
        image={image}
        previewTitle="360 Virtual Tour"
        author="Strategy Fox"
        previewAuthor="Strategy Fox"
        autoRotate={2}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        compass
        disableKeyboardCtrl
        // @ts-ignore
        ref={panImage}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={-1.4}
          yaw={113.6}
          handleClick={() => startTransition(() => navigate("/page2") as void)}
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={12}
          yaw={114.5}
          cssClass="custom-hotspot"
          handleClick={handleOpenModal}
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={75}
          yaw={75}
          cssClass="custom-hotspot"
          handleClick={handleOpenModal}
        />
      </Pannellum>

      {/* Product Detail Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "70vh", // Prevents overflow
            bgcolor: "rgba(0,0,0,0.9)",
            borderRadius: "10px",
            p: 3,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>

          {/* Toggle Pictures / 3D View */}
          <ToggleButtonGroup
            // value={viewMode}
            exclusive
            onChange={(e, newView) => setViewMode(newView)}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <ToggleButton value="pictures" sx={{ color: "#fff" }}>
              Pictures
            </ToggleButton>
            <ToggleButton value="3dview" sx={{ color: "#fff" }}>
              3D View
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Content Layout */}
          <Box sx={{ display: "flex", gap: 3, flex: 1, overflow: "hidden" }}>
            {/* Left Side - Image / 3D Model */}
            <Box sx={{ flex: 1 }}>
              {viewMode === "pictures" ? (
                <img
                  src="https://cdn.shopify.com/s/files/1/0737/4369/6117/files/5.png?v=1737542077"
                  alt="Product"
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                // @ts-ignore
                <model-viewer
                  src="https://cdn.shopify.com/3d/models/o/2b89ca013896399a/final_sports.glb"
                  alt="3D Model"
                  auto-rotate
                  camera-controls
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Box>

            {/* Right Side - Product Details (Scrollable) */}
            <Box
              sx={{
                flex: 1,
                maxHeight: "80vh", // Keep within modal height
                overflowY: "auto", // Scrollable
                paddingRight: "10px",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                SerenWear Active Set
              </Typography>
              <Typography variant="h6" sx={{ color: "#ddd" }}>
                ₹ 1000.00 <del style={{ color: "red" }}>2000.00</del>
              </Typography>

              {/* Color Selection */}
              <Typography sx={{ mt: 2 }}>Color</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Black", "Gray", "Brown"].map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "contained" : "outlined"}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      bgcolor: selectedColor === color ? "#666" : "transparent",
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </Box>

              {/* Size Selection */}
              <Typography sx={{ mt: 2 }}>Size</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["S", "M", "L", "XL", "2XL"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      bgcolor: selectedSize === size ? "#666" : "transparent",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>

              {/* Quantity Selection */}
              <Typography sx={{ mt: 2 }}>Quantity :</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                >
                  -
                </Button>
                <Typography>{quantity}</Typography>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                >
                  +
                </Button>
              </Box>

              {/* Description (Inside Modal) */}
              <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: "20px" }}>
                Description
              </Typography>
              <Typography sx={{ mt: 1, textAlign: "justify" }}>
                The SereneWear Active Set is the perfect blend of comfort and
                style, designed for individuals who value effortless mobility
                and understated elegance. Crafted from premium, lightweight
                fabric, this set ensures maximum breathability and flexibility,
                making it an ideal choice for casual outings, workout sessions,
                or simply lounging in style. The minimalist design is
                accentuated by clean lines and a sleek silhouette, while the
                neutral tones make it versatile enough to pair with your
                favorite accessories. With practical features such as hidden
                pockets and elastic cuffs, this set seamlessly combines
                functionality with aesthetic appeal.
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button variant="contained" sx={{ bgcolor: "#666" }}>
                  Add to Cart
                </Button>
                <Button variant="contained" sx={{ bgcolor: "#444" }}>
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Page1;
