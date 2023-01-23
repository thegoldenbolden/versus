export default function Skeleton(props: JSX.IntrinsicElements["div"]) {
 return (
  <div
   className={`${props.className} bg-smoky-black-translucent dark:bg-lotion-translucent motion-safe:animate-pulse`}
  />
 );
}
