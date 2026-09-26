export const formatDate = (dateString) => {
  if (!dateString) return "No deadline";
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};