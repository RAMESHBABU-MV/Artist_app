import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService, type User } from '../services/UserService';
import { useToast } from '../components/common/Toast';

export const useUsers = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();


    const {
        data: users = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await UserService.getAllUsers();
            return data as User[];
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
            UserService.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast('User updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update user', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => UserService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast('User deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete user', 'error');
        }
    });

    return {
        users,
        isLoading,
        error,
        refetch,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
