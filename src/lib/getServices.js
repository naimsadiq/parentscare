export const getServices = async () => {
  const services = (await fetch("/data/services.json")).json();
  console.log(services)
  return services;
};
