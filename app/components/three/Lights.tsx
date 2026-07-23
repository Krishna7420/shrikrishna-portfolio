"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={4}
      />
      <pointLight
        position={[-5, 3, 5]}
        intensity={2}
        color="#4facfe"
      />
    </>
  );
}