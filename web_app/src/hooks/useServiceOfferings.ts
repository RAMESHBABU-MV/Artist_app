import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ServiceOfferingService, type ServiceOffering } from '../services/ServiceOfferingService';
import { useToast } from '../components/common/Toast';

export const useServiceOfferings = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        data: serviceOfferings = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const data = await ServiceOfferingService.getAll();
            return data as ServiceOffering[];
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<ServiceOffering>) => ServiceOfferingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            showToast('Service created successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to create service', 'error');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<ServiceOffering> }) =>
            ServiceOfferingService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            showToast('Service updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update service', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => ServiceOfferingService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            showToast('Service deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete service', 'error');
        }
    });

    return {
        serviceOfferings,
        isLoading,
        error,
        refetch,
        createServiceOffering: createMutation.mutate,
        updateServiceOffering: updateMutation.mutate,
        deleteServiceOffering: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
