import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminInstance } from "api";

export const deleteVideo = async (id) => {
  const response = await adminInstance.delete(`reels/${id}`);
  return response.data;
};

export const editVideo = async ({ id, updatedData }) => {
  const response = await adminInstance.put(`reels/${id}/`, updatedData);
  return response.data;
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      // Invalidate and refetch the videos list after successful deletion
      queryClient.invalidateQueries(["reels"]);
    },
    onError: (error) => {
      console.error("Error deleting video:", error);
    },
  });
};
