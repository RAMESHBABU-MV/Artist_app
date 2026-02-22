import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService, type Review } from '../services/ReviewService';
import { useToast } from '../components/common/Toast';

export const useReviews = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        data: reviews = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const data = await ReviewService.getAll();
            return data as Review[];
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<Review>) => ReviewService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            showToast('Review created successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to create review', 'error');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Review> }) =>
            ReviewService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            showToast('Review updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update review', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => ReviewService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            showToast('Review deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete review', 'error');
        }
    });

    return {
        reviews,
        isLoading,
        error,
        refetch,
        createReview: createMutation.mutate,
        updateReview: updateMutation.mutate,
        deleteReview: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
