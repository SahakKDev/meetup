import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery /*useMutation*/ } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  const {
    data: event,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000,
  });
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async ({ event }) => {
  //     await queryClient.cancelQueries({ queryKey: ["events", id] });

  //     const prevEvent = queryClient.getQueryData(["events", id]);
  //     queryClient.setQueryData(["events", id], event);

  //     return { prevEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", id], context.prevEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["events", id],
  //     });
  //   },
  // });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (event) {
    content = (
      <EventForm inputData={event} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            {" "}
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

EditEvent.loader = function loader({ params }) {
  const { id } = params;

  return queryClient.fetchQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });
};

EditEvent.action = async function action({ request, params }) {
  const { id } = params;

  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);

  await updateEvent({ id, event: updatedEvent });

  await queryClient.invalidateQueries({
    queryKey: ["events"],
  });

  return redirect("../");
};
