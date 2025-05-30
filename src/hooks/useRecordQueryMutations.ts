import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Range } from 'src/pages/Records/Records';
import {
  Record,
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from 'src/services/api';

interface UpdateParams {
  id: number;
  body: Partial<Record>;
}

const useRecordQueryMutations = (range: Range) => {
  const queryClient = useQueryClient();

  const createRecordMutation = useMutation({
    mutationFn: ({
      date = dayjs.utc(dayjs().format('YYYY-MM-DD')),
      description = 'New record',
      accountId = null,
      amount = 0,
    }: {
      date?: dayjs.Dayjs;
      description?: string;
      accountId?: number | null;
      amount?: number;
    }) => createRecord(date, description, accountId, amount),
    onMutate: async ({
      date = dayjs.utc(dayjs().format('YYYY-MM-DD')),
      description = 'New record',
      accountId = null,
      amount = 0,
    }) => {
      await queryClient.cancelQueries({ queryKey: ['records', range] });
      const previousRecords = queryClient.getQueryData(['records', range]);
      queryClient.setQueryData(['records', range], (old: Record[]) => {
        return [
          ...old,
          {
            id: -1,
            date,
            description,
            account_id: accountId,
            amount,
          },
        ];
      });
      return { previousRecords };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['records', range], context?.previousRecords);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['records', range] }),
  });

  const recordQuery = useQuery({
    queryKey: ['records', range],
    queryFn: async () => {
      const from = range?.start?.format('YYYY-MM-DD');
      const to = range?.end?.format('YYYY-MM-DD');
      return getRecords(from, to);
    },
    staleTime: Infinity,
  });

  const updateRecordMutation = useMutation({
    mutationFn: ({ id, body }: UpdateParams) => updateRecord(id, body),
    onMutate: async ({ id, body }: UpdateParams) => {
      await queryClient.cancelQueries({ queryKey: ['records', range] });
      const previousRecords = queryClient.getQueryData(['records', range]);
      queryClient.setQueryData(['records', range], (old: Record[]) => {
        const clone = old.map((x) => ({
          ...structuredClone(x),
          date: dayjs.utc(x.date),
        }));
        const found = clone.find((x) => x.id === id);
        Object.entries(body).forEach(([key, value]) => {
          if (found) {
            (found[key as keyof typeof body] as typeof value) = value;
          }
        });
        return clone;
      });
      return { previousRecords };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['records', range], context?.previousRecords);
    },
    onSettled: async () =>
      queryClient.invalidateQueries({ queryKey: ['records', range] }),
  });

  const deleteRecordMutation = useMutation({
    mutationFn: deleteRecord,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['records', range] });
      const previousRecords = queryClient.getQueryData(['records', range]);
      queryClient.setQueryData(['records', range], (old: Record[]) =>
        old.filter((record) => record.id !== id)
      );
      return { previousRecords };
    },
    onError: (err, _, context) => {
      console.error('Error: ', err);
      queryClient.setQueryData(['records', range], context?.previousRecords);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['records', range] }),
  });

  return {
    createRecordMutation,
    recordQuery,
    updateRecordMutation,
    deleteRecordMutation,
  };
};

export default useRecordQueryMutations;
