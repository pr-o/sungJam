defmodule SungJam.Repo do
  use Ecto.Repo,
    otp_app: :sungJam,
    adapter: Ecto.Adapters.Postgres
end
