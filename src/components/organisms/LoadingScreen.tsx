import SpinLoader from '../../assets/Spin.svg';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={SpinLoader} alt="Loading . . ." />
    </div>
  );
}
